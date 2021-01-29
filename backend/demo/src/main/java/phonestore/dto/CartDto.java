package phonestore.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;

import phonestore.entity.CartPhone;

public class CartDto {

	private Long id;

	private List<CartPhoneDto> cartPhoneDtos;

	public Long getId() {
		return id;
	}

	public List<CartPhoneDto> getCartPhoneDtos() {
		return cartPhoneDtos;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setCartPhoneDtos(List<CartPhoneDto> cartPhoneDtos) {
		this.cartPhoneDtos = cartPhoneDtos;
	}
}