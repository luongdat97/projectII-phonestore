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
import phonestore.entity.Staff;
import phonestore.entity.CartPhone;
import phonestore.entity.Customer;
import phonestore.entity.Order;

@Repository
@Transactional
public class StaffDao {

	@Autowired
	private SessionFactory sessionFactory;

	public StaffDao() {
	}

	public Staff findStaffById(Long id) {
		Session session = this.sessionFactory.getCurrentSession();
		return session.find(Staff.class, id);
	}
	
	public Staff findStaffByUsername(String username) {
		Session session = this.sessionFactory.getCurrentSession();
		List<Staff> staffs = session.createQuery("SELECT s FROM Staff s WHERE s.username LIKE '" + username + "'", Staff.class).getResultList();
		if (staffs != null && staffs.size() != 0 ) {
			return staffs.get(0);
		} else {
			return null;
		}
	}
	
	public Long saveStaff(Staff staff) {
		Session session = this.sessionFactory.getCurrentSession();
		return (long) session.save(staff);
	}
	
	public List<Staff> findAllStaff() {
		Session session = this.sessionFactory.getCurrentSession();
		return session.createQuery("SELECT s FROM Staff s ORDER BY s.id DESC", Staff.class).getResultList();
	}
	
	public void updateStaff(Staff staff) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(staff);
	}
}

