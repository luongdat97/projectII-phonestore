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
import phonestore.entity.ImportGoods;

@Repository
@Transactional
public class ImportGoodsDao {

	@Autowired
	private SessionFactory sessionFactory;

	public ImportGoodsDao() {
	}

	public ImportGoods findImportById(Long id) {
		Session session = this.sessionFactory.getCurrentSession();
		return session.find(ImportGoods.class, id);
	}
	
	public Long saveImport(ImportGoods importGoods) {
		Session session = this.sessionFactory.getCurrentSession();
		return (long) session.save(importGoods);
	}
	
	public List<ImportGoods> findAllImport() {
		Session session = this.sessionFactory.getCurrentSession();
		return session.createQuery("SELECT DISTINCT o FROM ImportGoods o" + " ORDER BY o.id DESC ", ImportGoods.class).getResultList();
	}
	
	public Long deleteImportById(Long id) {
		Session session = this.sessionFactory.getCurrentSession();
		session.delete(new ImportGoods(id));
		return 1L;
	}
	
	public Long updateImport(ImportGoods importGoods) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(importGoods);
		return 1L;
	}
	
}

