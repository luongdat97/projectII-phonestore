package phonestore.dto;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;

import phonestore.entity.Order;
import phonestore.entity.Phone;

public class OrderPhoneDto {
	
	private Long id;
	
	private Phone phone;
	
	private int quantity;

	public Long getId() {
		return id;
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

	public void setPhone(Phone phone) {
		this.phone = phone;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
}
