package phonestore.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import phonestore.entity.Order;
import phonestore.entity.PhoneType;

@Repository
@Transactional
public class PhoneTypeDao {

	@Autowired
	private SessionFactory sessionFactory;

	public PhoneTypeDao() {
	}

	public PhoneType findById(Long id) {
		Session session = this.sessionFactory.getCurrentSession();
		String hql = "SELECT DISTINCT p FROM PhoneType p JOIN FETCH p.phones WHERE p.id = " + id;
		return session.createQuery(hql, PhoneType.class).getResultList().get(0);
	}

	public List<PhoneType> findAllPhone() {
		Session session = this.sessionFactory.getCurrentSession();
		return session.createQuery("SELECT DISTINCT p FROM PhoneType p JOIN FETCH p.phones", PhoneType.class).getResultList();
	}

	public List<PhoneType> findAllPhone(String sorter, String[] filterBrand, String[] filterPrice, String[] filterBattery,
			String[] filterScreenSize) {
		System.out.println("sorter");
		System.out.println(sorter);
		System.out.println(filterBrand.length);
		System.out.println(filterPrice.length);
		System.out.println(filterBattery.length);
		System.out.println();
		System.out.println();
		Session session = this.sessionFactory.getCurrentSession();
		String hql = "SELECT DISTINCT p FROM PhoneType p JOIN FETCH p.phones ph LEFT JOIN OrderPhone op ON op.phone.id = ph.id LEFT JOIN Order o ON op.order.id = o.id WHERE ";

		if (!filterBrand[0].equals("all"))
			hql += " (p.brand in (:brands)) AND ";

		if (!filterPrice[0].equals("all")) {
			hql += " ( ";
			for (String filter : filterPrice) {
				String[] filterArray = filter.split("-");
				String from = filterArray[0] + "000000";
				String to = filterArray[1] + "000000";
				hql += " (p.price >= " + from + " and p.price <= " + to + " ) OR ";
			}
			hql += " ( 1 = 2 ) ";
			hql += " ) AND ";
		}
		
		if (!filterBattery[0].equals("all")) {
			hql += " ( ";
			for (String filter : filterBattery) {
				String[] filterArray = filter.split("-");
				String from = filterArray[0];
				String to = filterArray[1];
				hql += " (p.battery >= " + from + " and p.battery <= " + to + " ) OR ";
			}
			hql += " ( 1 = 2 ) ";
			hql += " ) AND ";
		}
		
		if (!filterScreenSize[0].equals("all")) {
			hql += " ( ";
			for (String filter : filterScreenSize) {
				String[] filterArray = filter.split("-");
				String from = filterArray[0];
				String to = filterArray[1];
				hql += " (p.screenSize >= " + from + " and p.screenSize <= " + to + " ) OR ";
			}
			hql += " ( 1 = 2 ) ";
			hql += " ) AND ";
		}
		
		hql += " ( 1 = 1 )  ";
		hql += " GROUP BY p.id ";
		
		
		
		if ("best_sell".equals(sorter))
			hql += " ORDER BY SUM(case when o.state = 3 then op.quantity else 0 end) DESC ";
		if ("expensive".equals(sorter))
			hql += " ORDER BY p.price DESC ";
		if ("low_price".equals(sorter))
			hql += " ORDER BY p.price ASC ";
		if ("launch_date".equals(sorter))
			hql += " ORDER BY p.release DESC ";
		System.out.println(sorter);
		System.out.println(hql);
		Query<PhoneType> query = session.createQuery(hql, PhoneType.class);
		if (!filterBrand[0].equals("all"))
			query.setParameterList("brands", filterBrand);
		return query.getResultList();
	}
	
	public Long savePhoneType(PhoneType phoneType) {
		Session session = this.sessionFactory.getCurrentSession();
		return (long) session.save(phoneType);
	}
	
	public Long deletePhoneTypeById(Long id) {
		Session session = this.sessionFactory.getCurrentSession();
		session.delete(new PhoneType(id));
		return 1L;
	}
}
