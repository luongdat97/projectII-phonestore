package phonestore.entity;

import java.util.Date;

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
@Table(name = "import_goods")
public class ImportGoods {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
	@GenericGenerator(name = "native", strategy = "native")
	@Column(name = "id", nullable = false)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "phone_id")
	private Phone phone;

	@Column(name = "quantity")
	private String quantity;

	@Column(name = "price")
	private String price;

	@Column(name = "created")
	private Date created;

	public ImportGoods() {

	}

	public ImportGoods(Long id) {
		super();
		this.id = id;
	}



	public Long getId() {
		return id;
	}

	public Phone getPhone() {
		return phone;
	}

	public String getQuantity() {
		return quantity;
	}

	public String getPrice() {
		return price;
	}

	public Date getCreated() {
		return created;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setPhone(Phone phone) {
		this.phone = phone;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

}
