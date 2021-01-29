package phonestore.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import phonestore.dao.ImportGoodsDao;
import phonestore.entity.ImportGoods;

@RestController
public class ImportGoodsController {
	@Autowired
	private ImportGoodsDao importGoodsDao;

	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("/import")
	Long createNewImport(@RequestBody ImportGoods importGoods) {
		return importGoodsDao.saveImport(importGoods);
	}

	@DeleteMapping("/import/{id}")
	Long deleteImport(@PathVariable Long id) {
		System.out.println("delete..........");
		System.out.println(id);
		importGoodsDao.deleteImportById(id);
		return 1L;
	}

	@PutMapping("/import/{id}")
	Long editImport(@PathVariable Long id, @RequestBody ImportGoods importNew) {
		ImportGoods importOld = importGoodsDao.findImportById(id);
		importOld.setCreated(importNew.getCreated());
		importOld.setPrice(importNew.getPrice());
		importOld.setQuantity(importNew.getQuantity());
		importGoodsDao.updateImport(importOld);
		return 1L;

	}

	@GetMapping("/import")
	List<ImportGoods> getAllImport() {
		System.out.println("import >>>>>>>>>>>>>>>....................");

		return importGoodsDao.findAllImport();
	}

}
