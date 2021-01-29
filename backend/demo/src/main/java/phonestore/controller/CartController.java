package phonestore.controller;

import java.lang.reflect.Type;
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
import phonestore.dto.PhoneDto;
import phonestore.dao.CartPhoneDao;
import phonestore.entity.Cart;
import phonestore.entity.PhoneType;
import phonestore.entity.Store;
import phonestore.exception.BankTransactionException;

@RestController
public class CartController {
	@Autowired
	private CartDao cartDao;
	
	@Autowired
	private CartPhoneDao cartPhoneDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private StoreDao storeDao;

	@PostMapping("/cart")
	Long createNewCart(@RequestParam int phoneDetailId) {
		System.out.println("postttttttttttttttttttttttttttttttt");
		System.out.println(phoneDetailId);
		
		Long cartId =  cartDao.createNewCart();
		cartPhoneDao.createCartPhone(cartId, (long)phoneDetailId, 1);
		return cartId;
	}
	
	@DeleteMapping("/cart")
	void deleteCartDetail(@RequestParam Long id) {
		cartPhoneDao.DeleteCartPhoneById(id);
	}
	
	@PutMapping("/cart/{cartId}")
	Long editCart(@RequestParam Long phoneId, @PathVariable Long cartId, @RequestParam int quantity) {
		System.out.println("puttttttttttttttttttttttttttttt");
		System.out.println(phoneId);
		cartPhoneDao.saveOrUpdateCartPhone(cartId, phoneId, quantity);
		return 1L;
		
	}

	@GetMapping("/cart/{id}")
	CartDto getCart(@PathVariable Long id) {
		System.out.println("gettttttttttttttttttttttttttttt");
		Cart cart = cartDao.findCartById(id);
		
		CartDto dto = modelMapper.map(cart, CartDto.class);
		
		Type listType = new TypeToken<List<CartPhoneDto>>() {
		}.getType();
		dto.setCartPhoneDtos(modelMapper.map(cart.getCartPhones(), listType));
		System.out.println(dto);
		return dto;
	}
	
	@GetMapping("/store")
	List<Store> getAllStore() {
		System.out.println("getttttttttttttttttttttttttttttstoreeee");
		return storeDao.getAllStore();
	}
	
//	@PutMapping("/cart/{id}")
//	  Cart replaceEmployee(@RequestBody Cart newCart, @PathVariable Long id) {
//
//	    cartDao.findCartById(id)
//	    
//	  }

}
