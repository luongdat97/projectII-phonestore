package phonestore.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "orderr")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
	@GenericGenerator(name = "native", strategy = "native")
	@Column(name = "id", nullable = false)
	private Long id;
	
	@ManyToOne
    @JoinColumn(name="customer_id", nullable=false)
	private Customer customer;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created", insertable=false)
	private Date created;
	
	@Column(name = "order_method")
	private int orderMethod; //0 : nhận tại shop, 1: shipping
	
	@Column(name = "payment_method")
	private int paymentMethod; // 
	
	@Column(name = "address")
	private String address;
	
	@ManyToOne
	private Store store;
	
	@Column(name = "state")
	private int state;
	
	@ManyToOne
    @JoinColumn(name="staff_id", nullable=true)
	private Staff staff;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "order", fetch = FetchType.LAZY)
	private List<OrderPhone> orderPhones;

	public Order() {
	}
	

	public Order(Customer customer, Date created, int orderMethod, int paymentMethod, String address, Store store,
			int state, Staff staff, List<OrderPhone> orderPhones) {
		super();
		this.customer = customer;
		this.created = created;
		this.orderMethod = orderMethod;
		this.paymentMethod = paymentMethod;
		this.address = address;
		this.store = store;
		this.state = state;
		this.staff = staff;
		this.orderPhones = orderPhones;
	}



	public Long getId() {
		return id;
	}

	public Customer getCustomer() {
		return customer;
	}

	public Date getCreated() {
		return created;
	}

	public int getOrderMethod() {
		return orderMethod;
	}

	public int getPaymentMethod() {
		return paymentMethod;
	}

	public String getAddress() {
		return address;
	}

	public Store getStore() {
		return store;
	}

	public int getState() {
		return state;
	}

	public Staff getStaff() {
		return staff;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public void setOrderMethod(int orderMethod) {
		this.orderMethod = orderMethod;
	}

	public void setPaymentMethod(int paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setStore(Store store) {
		this.store = store;
	}

	public void setState(int state) {
		this.state = state;
	}

	public void setStaff(Staff staff) {
		this.staff = staff;
	}

	public List<OrderPhone> getOrderPhones() {
		return orderPhones;
	}

	public void setOrderPhones(List<OrderPhone> orderPhones) {
		this.orderPhones = orderPhones;
	}


	@Override
	public String toString() {
		return "Order [id=" + id + ", customer=" + customer + ", created=" + created + ", orderMethod=" + orderMethod
				+ ", paymentMethod=" + paymentMethod + ", address=" + address + ", store=" + store + ", state=" + state
				+ ", staff=" + staff + ", orderPhones=" + orderPhones + "]";
	}


	
	
	
	
}
