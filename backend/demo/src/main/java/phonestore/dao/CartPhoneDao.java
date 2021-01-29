package phonestore.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import phonestore.entity.Cart;
import phonestore.entity.PhoneType;
import phonestore.entity.Phone;
import phonestore.entity.CartPhone;

@Repository
@Transactional
public class CartPhoneDao {

	@Autowired
	private SessionFactory sessionFactory;

	public CartPhoneDao() {
	}

	public CartPhone findCartPhoneById(Long id) {
		Session session = this.sessionFactory.getCurrentSession();
		return session.get(CartPhone.class, id);
	}

	public Long createCartPhone(Long cartId, Long phoneId, int quantity) {
		Session session = this.sessionFactory.getCurrentSession();
		CartPhone cartDetail = new CartPhone(new Phone(phoneId),new Cart(cartId),  quantity);
		return (Long) session.save(cartDetail);
	}
	
	public void saveOrUpdateCartPhone(Long cartId, Long phoneId, int quantity) {
		Session session = this.sessionFactory.getCurrentSession();
		String hql = "SELECT c FROM CartPhone c WHERE c.cart = " + cartId + " AND c.phone = " + phoneId;
		List<CartPhone> cartPhones = session.createQuery(hql, CartPhone.class).getResultList();
		
		if (cartPhones.size() == 0) {
			createCartPhone(cartId, phoneId, quantity);
			return;
		} else {
			CartPhone cartPhone = cartPhones.get(0);
			cartPhone.setQuantity(quantity);
			session.update(cartPhone);
		}
	}

	public void DeleteCartPhoneById(Long id) {
		Session session = this.sessionFactory.getCurrentSession();
		CartPhone cartDetail = session.get(CartPhone.class, id);
		if (cartDetail != null) {
			session.delete(cartDetail);
		}
	}
	
	public void DeleteCartPhone(Long cartId, Long phoneId) {
		Session session = this.sessionFactory.getCurrentSession();
		String hql = "SELECT c FROM CartPhone c WHERE c.cart = " + cartId + " AND c.phone = " + phoneId;
		List<CartPhone> cartPhones = session.createQuery(hql, CartPhone.class).getResultList();
		if (cartPhones.size() > 0 ) {
			CartPhone cartPhone = cartPhones.get(0);
			session.delete(cartPhone);
		}
	}
	public void DeleteCartPhoneByCartId(Long cartId) {
		Session session = this.sessionFactory.getCurrentSession();
		String hql = "DELETE FROM CartPhone c WHERE c.cart = " + cartId;
		session.createQuery(hql).executeUpdate();
		
	}

	// public void updateCartDetail (Long id, )
}
