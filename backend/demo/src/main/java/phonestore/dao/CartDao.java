package phonestore.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import phonestore.entity.Cart;
import phonestore.entity.PhoneType;
import phonestore.entity.CartPhone;

@Repository
@Transactional
public class CartDao {

	@Autowired
	private SessionFactory sessionFactory;

	public CartDao() {
	}

	public Cart findCartById(Long id) {
		Session session = this.sessionFactory.getCurrentSession();
		String hql = "SELECT DISTINCT c FROM Cart c JOIN FETCH c.cartPhones WHERE c.id = " + id;
		return session.createQuery(hql, Cart.class).getResultList().get(0);
	}
	
	public Long createNewCart() {
		Session session = this.sessionFactory.getCurrentSession();
		Cart cart = new Cart();
		return (Long) session.save(cart);
	}
}
