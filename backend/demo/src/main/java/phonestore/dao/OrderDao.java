package phonestore.dao;

import java.util.Date;
import java.util.List;

import javax.persistence.TemporalType;

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
import phonestore.entity.Order;

@Repository
@Transactional
public class OrderDao {

	@Autowired
	private SessionFactory sessionFactory;

	public OrderDao() {
	}

	public Order findOrderById(Long id) {
		Session session = this.sessionFactory.getCurrentSession();
		return session.find(Order.class, id);
	}

	public Long createNewOrder() {
		Session session = this.sessionFactory.getCurrentSession();
		Order order = new Order();
		return (Long) session.save(order);
	}

	public Long saveOrder(Order order) {
		Session session = this.sessionFactory.getCurrentSession();
		return (long) session.save(order);
	}

	public List<Order> findAllOrder() {
		Session session = this.sessionFactory.getCurrentSession();
		return session.createQuery("SELECT DISTINCT o FROM Order o JOIN FETCH o.orderPhones", Order.class)
				.getResultList();
	}

	public List<Order> findAllInvoice() {
		Session session = this.sessionFactory.getCurrentSession();
		return session.createQuery(
				"SELECT DISTINCT o FROM Order o JOIN FETCH o.orderPhones WHERE o.orderMethod = 0 AND o.state = 3 ORDER BY o.id DESC",
				Order.class).getResultList();
	}

	public List<Order> findAllOrderByCustomerId(Long customerId) {
		Session session = this.sessionFactory.getCurrentSession();
		return session.createQuery("SELECT DISTINCT o FROM Order o JOIN FETCH o.orderPhones WHERE o.customer = "
				+ customerId + " ORDER BY o.id DESC ", Order.class).getResultList();
	}

	public void updateOrder(Order order) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(order);
	}

	public List<Order> statisticOrderByMonth(Date date) {
		Session session = this.sessionFactory.getCurrentSession();
		Query query = session.createQuery(
				"SELECT DISTINCT o FROM Order o JOIN FETCH o.orderPhones WHERE month(o.created) = month(:date) AND YEAR(o.created) = YEAR(:date) AND o.state = 3",
				Order.class);
		query.setParameter("date", date, TemporalType.DATE);
		return query.getResultList();
	}

	public List<Order> statisticOrderByQuarter(Date date) {
		Session session = this.sessionFactory.getCurrentSession();
		Query query = session.createQuery(
				"SELECT DISTINCT o FROM Order o JOIN FETCH o.orderPhones WHERE QUARTER(o.created) = QUARTER(:date) AND YEAR(o.created) = YEAR(:date) AND o.state = 3",
				Order.class);
		query.setParameter("date", date, TemporalType.DATE);
		return query.getResultList();
	}

	public List<Order> statisticOrderByYear(Date date) {
		Session session = this.sessionFactory.getCurrentSession();
		Query query = session.createQuery(
				"SELECT DISTINCT o FROM Order o JOIN FETCH o.orderPhones WHERE YEAR(o.created) = YEAR(:date) AND o.state = 3",
				Order.class);
		query.setParameter("date", date, TemporalType.DATE);
		return query.getResultList();
	}

	public List<Object[]> statisticOrderForChart() {
		Session session = this.sessionFactory.getCurrentSession();
		String queryString = "SELECT DATE_FORMAT(o.created, \"%Y-%m\") d, sum(op.quantity) FROM phonestore.orderr o \r\n"
				+ "INNER JOIN order_phone op  ON o.id=op.order_id\r\n" + "WHERE o.state = 3 AND o.created <= NOW()\r\n"
				+ "and o.created >= CAST(DATE_FORMAT(Date_add(Now(),interval - 11 month) ,'%Y-%m-01') as DATE)\r\n"
				+ "GROUP BY DATE_FORMAT(o.created, \"%Y-%m\")\r\n" + "order by d asc";
		Query query = session.createSQLQuery(queryString);
		List<Object[]> rows = query.list();
		
		return rows;
	}
}
