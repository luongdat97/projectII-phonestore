package phonestore.entity;
import java.util.List;

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

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
 
@Entity
@Table(name = "customer")
public class Customer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
	@GenericGenerator(name = "native", strategy = "native")
	@Column(name = "id", nullable = false)
    private Long id;
	
	@OneToMany(mappedBy = "customer", fetch = FetchType.LAZY)
    @JsonIgnore
	private List<Order> orders;
	
	@Column(name = "name")
    private String Name;
	
	@Column(name = "phone_number")
    private String phoneNumber;
	
	@Column(name = "email")
    private String email;
	
	public Customer() {
		
	}
	
	public Customer(String name, String phoneNumber, String email) {
		super();
		Name = name;
		this.phoneNumber = phoneNumber;
		this.email = email;
	}
	
	public Customer(Long id) {
		super();
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return Name;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		Name = name;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	@Override
	public String toString() {
		return "Customer [Name=" + Name + ", phoneNumber=" + phoneNumber + ", email=" + email + "]";
	}
	
	
	
}
