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
import phonestore.entity.Customer;

@Repository
@Transactional
public class CustomerDao {

	@Autowired
	private SessionFactory sessionFactory;

	public CustomerDao() {
	}

	public Customer findCustomerById(Long id) {
		Session session = this.sessionFactory.getCurrentSession();
		return session.find(Customer.class, id);
	}
	
	public Customer findCustomerByPhoneNumber(String phoneNumber) {
		Session session = this.sessionFactory.getCurrentSession();
		String hql = "SELECT c FROM Customer c  WHERE c.phoneNumber LIKE " + "'" +phoneNumber + "'";
		List<Customer> customers = session.createQuery(hql, Customer.class).getResultList();
		Customer customer = null;
		if (customers != null && customers.size() != 0) {
			customer = customers.get(0);
		}
		return customer;
	}
	
	public void saveOrUpdateCustomer(Customer customer) {
		Session session = this.sessionFactory.getCurrentSession();
		session.saveOrUpdate(customer);
	}
	
	public Long saveCustomer(Customer customer) {
		Session session = this.sessionFactory.getCurrentSession();
		return (Long)session.save(customer);
	}
	
	public Long createNewCustomer() {
		Session session = this.sessionFactory.getCurrentSession();
		Customer customer = new Customer();
		return (Long) session.save(customer);
	}
	
	public Long createNewCustomer(String name, String phoneNumber, String email) {
		Session session = this.sessionFactory.getCurrentSession();
		Customer customer = new Customer(name, phoneNumber, email);
		return (Long) session.save(customer);
	}
	public void updateCustomer(Customer customer) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(customer);
	}
}
