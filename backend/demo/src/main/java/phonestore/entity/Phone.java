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
@Table(name = "phone")
public class Phone {
 
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
	@GenericGenerator(name = "native", strategy = "native")
    @Column(name = "id", nullable = false)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name="phone_type_id", nullable=false)
    private PhoneType phoneType;
    
    @OneToMany(mappedBy = "phone", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<CartPhone> cartPhones;
    
    @Column(name = "color")
    private String color;
    
    @Column(name = "image")
    private String image;
    
    @Column(name = "quantity")
    private int quantity;

	 

	public Long getId() {
		return id;
	}

	public PhoneType getPhoneType() {
		return phoneType;
	}

	public List<CartPhone> getCartPhones() {
		return cartPhones;
	}

	public String getColor() {
		return color;
	}

	public String getImage() {
		return image;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setPhoneType(PhoneType phoneType) {
		this.phoneType = phoneType;
	}

	public void setCartPhones(List<CartPhone> cartPhones) {
		this.cartPhones = cartPhones;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Phone(Long id) {
		super();
		this.id = id;
	}
	
	public Phone() {
		
	}

	@Override
	public String toString() {
		return "Phone [id=" + id + ", color=" + color + "]";
	}
	
}
