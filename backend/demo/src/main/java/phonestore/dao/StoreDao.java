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
import phonestore.entity.Store;
import phonestore.entity.CartPhone;
import phonestore.entity.Customer;

@Repository
@Transactional
public class StoreDao {

	@Autowired
	private SessionFactory sessionFactory;

	public StoreDao() {
	}

	public Store findStoreById(Long id) {
		Session session = this.sessionFactory.getCurrentSession();
		return session.find(Store.class, id);
	}
	
	public Long createNewStore() {
		Session session = this.sessionFactory.getCurrentSession();
		Store store = new Store();
		return (Long) session.save(store);
	}
	
	public List<Store> getAllStore() {
		Session session = this.sessionFactory.getCurrentSession();
		return session.createQuery("SELECT a FROM Store a", Store.class).getResultList();
	}
}

