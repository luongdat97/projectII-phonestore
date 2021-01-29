package phonestore.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "order_phone")
public class OrderPhone {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
	@GenericGenerator(name = "native", strategy = "native")
	@Column(name = "id", nullable = false)
	private Long id;
	
	@ManyToOne
    @JoinColumn(name="order_id", nullable=false)
	private Order order;
	
	@ManyToOne
	@JoinColumn(name="phone_id", nullable=false)
	private Phone phone;
	
	@Column(name = "quantity")
	private int quantity;

	public Long getId() {
		return id;
	}

	public Order getOrder() {
		return order;
	}

	public Phone getPhone() {
		return phone;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public void setPhone(Phone phone) {
		this.phone = phone;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "OrderPhone [id=" + id + ", order=" + order + ", phone=" + phone + ", quantity=" + quantity + "]";
	}
	
	
}
