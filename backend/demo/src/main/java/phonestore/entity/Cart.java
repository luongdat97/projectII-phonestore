package phonestore.entity;

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

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "cart")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
	@GenericGenerator(name = "native", strategy = "native")
	@Column(name = "id", nullable = false)
	private Long id;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "cart", fetch = FetchType.LAZY)
	private List<CartPhone> cartPhones;
	
	public Cart() {
		
	}
	public Cart(Long id) {
		super();
		this.id = id;
	}
	public Long getId() {
		return id;
	}
	public List<CartPhone> getCartPhones() {
		return cartPhones;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setCartPhones(List<CartPhone> cartPhones) {
		this.cartPhones = cartPhones;
	}
	@Override
	public String toString() {
		return "Cart [id=" + id + ", cartPhones=" + cartPhones + "]";
	}

	

}
