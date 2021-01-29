package phonestore.controller;

import java.lang.reflect.Type;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import phonestore.dao.CartDao;
import phonestore.dao.PhoneTypeDao;
import phonestore.dao.StoreDao;
import phonestore.dto.CartDto;
import phonestore.dto.CartPhoneDto;
import phonestore.dto.CreateOrderDto;
import phonestore.dto.PhoneDto;
import phonestore.dao.CartPhoneDao;
import phonestore.dao.CustomerDao;
import phonestore.dao.OrderDao;
import phonestore.dao.PhoneDao;
import phonestore.entity.Cart;
import phonestore.entity.Customer;
import phonestore.entity.Order;
import phonestore.entity.OrderPhone;
import phonestore.entity.Phone;
import phonestore.entity.PhoneType;
import phonestore.entity.Store;
import phonestore.exception.BankTransactionException;

@RestController
public class OrderController {
	@Autowired
	private CartDao cartDao;
	
	@Autowired
	private CartPhoneDao cartPhoneDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private StoreDao storeDao;
	
	@Autowired
	private CustomerDao customerDao;
	
	@Autowired
	private OrderDao orderDao;
	
	@Autowired
	private PhoneDao phoneDao;

	@PostMapping("/order")
	Long createNewOrder(@RequestBody CreateOrderDto createOrderDto) {
		System.out.println("postttttttttttttttttttttttttttttttt");
		System.out.println(createOrderDto);
		Customer customerNew = createOrderDto.getCustomer();
		Customer customerOld = customerDao.findCustomerByPhoneNumber(customerNew.getPhoneNumber());
		Order order = createOrderDto.getOrder();
		if (customerOld != null) {
			customerNew.setId(customerOld.getId());
			customerDao.updateCustomer(customerNew);
		} else {
			Long id = customerDao.saveCustomer(customerNew);
			customerNew.setId(id);
		}
		order.setCustomer(customerNew);
		
		
		for (OrderPhone orderPhone: order.getOrderPhones()) {
			orderPhone.setOrder(order);
			Phone phone = phoneDao.findPhoneById(orderPhone.getPhone().getId());
			orderPhone.setPhone(phone);
		}
		if (createOrderDto.getCartId() != null) cartPhoneDao.DeleteCartPhoneByCartId(createOrderDto.getCartId());
		return orderDao.saveOrder(order);
	}

	
	
	@GetMapping("/order")
	List<Order> getAllOrder() {
		System.out.println("gettttttttttttttttttttttttttttt");
		List<Order> orders = orderDao.findAllOrder();
		for(Order order : orders) {
			for (OrderPhone orderPhone: order.getOrderPhones()) {
				orderPhone.setOrder(null);
			}
		}
		return orders;	
	}
	
	@GetMapping("/order/invoice")
	List<Order> getAllInvoice() {
		System.out.println("gettttttttttttttttttttttttttttt");
		List<Order> orders = orderDao.findAllInvoice();
		for(Order order : orders) {
			for (OrderPhone orderPhone: order.getOrderPhones()) {
				orderPhone.setOrder(null);
			}
		}
		return orders;	
	}
	
	@GetMapping("/order/statistic/by-month")
	List<Order> getAllInvoiceByMonth(@RequestParam Long date, @RequestParam int type) {
		//type 1: month, 2: quarter, 3: year
		List<Order> orders = null;
		if ( type == 1) orders = orderDao.statisticOrderByMonth(new Date(date));
		if ( type == 2) orders = orderDao.statisticOrderByQuarter(new Date(date));
		if ( type == 3) orders = orderDao.statisticOrderByYear(new Date(date));
		for(Order order : orders) {
			for (OrderPhone orderPhone: order.getOrderPhones()) {
				orderPhone.setOrder(null);
			}
		}
		return orders;	
	}
	
	@GetMapping("/order/statistic/chart")
	List<Object[]> getStatisticChart() {
		//type 1: month, 2: quarter, 3: year
		
		 List<Object[]> data = orderDao.statisticOrderForChart();
		
		return data;	
	}
	
	@PostMapping("/order/by-phone-number")
	List<Order> getAllOrderByePhoneNumber(@RequestBody String phoneNumber) {
		System.out.println("************");
		System.out.println(phoneNumber);
		Customer customer = customerDao.findCustomerByPhoneNumber(phoneNumber);
		System.out.println(customer);
		if (customer == null) return null;
		List<Order> orders = orderDao.findAllOrderByCustomerId(customer.getId());
		
		for(Order order : orders) {
			for (OrderPhone orderPhone: order.getOrderPhones()) {
				orderPhone.setOrder(null);
			}
		}
		return orders;
		
	}
	
	@PutMapping("/order/{orderId}")
	Long editOrder(@PathVariable Long orderId, @RequestBody Order newOrder ) {
		System.out.println("puttt");
		Order oldOrder = orderDao.findOrderById(orderId);
		oldOrder.setState(newOrder.getState());
		orderDao.updateOrder(oldOrder);
		return 1L;
		
	}
	
//	
//	@PutMapping("/cart/{cartId}")
//	Long editCart(@RequestParam Long phoneId, @PathVariable Long cartId, @RequestParam int quantity) {
//		System.out.println("puttttttttttttttttttttttttttttt");
//		System.out.println(phoneId);
//		cartPhoneDao.saveOrUpdateCartPhone(cartId, phoneId, quantity);
//		return 1L;
//		
//	}
//
//	@GetMapping("/cart/{id}")
//	CartDto getCart(@PathVariable Long id) {
//		System.out.println("gettttttttttttttttttttttttttttt");
//		Cart cart = cartDao.findCartById(id);
//		
//		CartDto dto = modelMapper.map(cart, CartDto.class);
//		
//		Type listType = new TypeToken<List<CartPhoneDto>>() {
//		}.getType();
//		dto.setCartPhoneDtos(modelMapper.map(cart.getCartPhones(), listType));
//		System.out.println(dto);
//		return dto;
//	}
//	
//	@GetMapping("/store")
//	List<Store> getAllStore() {
//		System.out.println("getttttttttttttttttttttttttttttstoreeee");
//		return storeDao.getAllStore();
//	}
	
//	@PutMapping("/cart/{id}")
//	  Cart replaceEmployee(@RequestBody Cart newCart, @PathVariable Long id) {
//
//	    cartDao.findCartById(id)
//	    
//	  }

}
