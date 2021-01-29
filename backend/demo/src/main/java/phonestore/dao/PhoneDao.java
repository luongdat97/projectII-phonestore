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
import phonestore.entity.Phone;

@Repository
@Transactional
public class PhoneDao {

	@Autowired
	private SessionFactory sessionFactory;

	public PhoneDao() {
	}

	public Phone findPhoneById(Long id) {
		Session session = this.sessionFactory.getCurrentSession();
		return session.find(Phone.class, id);
	}
	
}

