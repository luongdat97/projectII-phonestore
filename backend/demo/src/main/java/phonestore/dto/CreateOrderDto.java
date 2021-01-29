package phonestore.dto;

import phonestore.entity.Customer;
import phonestore.entity.Order;

public class CreateOrderDto {
	private Customer customer;
	private Order order;
	private Long cartId;
	
	public Customer getCustomer() {
		return customer;
	}
	public Order getOrder() {
		return order;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	
	public Long getCartId() {
		return cartId;
	}
	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}
	@Override
	public String toString() {
		return "createOrderDto [customer=" + customer.toString() + ", order=" + order.toString() + "]";
	}
	
	
}
