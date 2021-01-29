package phonestore.controller;

import java.lang.reflect.Type;
import java.util.List;

import org.hibernate.Hibernate;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import phonestore.dao.PhoneTypeDao;
import phonestore.dto.CreatePhoneTypeDto;
import phonestore.dto.PhoneDto;
import phonestore.dto.PhoneImportDto;
import phonestore.dto.PhoneTypeDto;
import phonestore.dto.ShortenPhoneTypeDto;
import phonestore.entity.PhoneType;
import phonestore.service.FileService;
import phonestore.entity.Phone;

@RestController
public class PhoneController {

	@Autowired
	private PhoneTypeDao phoneTypeDao;

	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
    FileService fileService;

	@GetMapping("/phone")
	List<ShortenPhoneTypeDto> getAllPhone(@RequestParam String sorter, @RequestParam String[] filterBrand,
			@RequestParam String[] filterPrice, @RequestParam String[] filterBattery,
			@RequestParam String[] filterScreenSize) {
		List<PhoneType> phoneTypes = phoneTypeDao.findAllPhone(sorter, filterBrand, filterPrice, filterBattery,
				filterScreenSize);

		Type listType = new TypeToken<List<ShortenPhoneTypeDto>>() {
		}.getType();
		List<ShortenPhoneTypeDto> phoneDtos = modelMapper.map(phoneTypes, listType);

		for (int i = 0; i < phoneDtos.size(); i++) {
			String image = phoneTypes.get(i).getPhones().get(0).getImage();
			phoneDtos.get(i).setImage(image);
		}

		System.out.println(phoneDtos);

		return phoneDtos;
	}
	
	@GetMapping("/phone/not-filter")
	List<ShortenPhoneTypeDto> getAllPhoneNotFilter() {
		List<PhoneType> phoneTypes = phoneTypeDao.findAllPhone();

		Type listType = new TypeToken<List<ShortenPhoneTypeDto>>() {
		}.getType();
		List<ShortenPhoneTypeDto> phoneDtos = modelMapper.map(phoneTypes, listType);

		for (int i = 0; i < phoneDtos.size(); i++) {
			String image = phoneTypes.get(i).getPhones().get(0).getImage();
			phoneDtos.get(i).setImage(image);
		}
		return phoneDtos;
	}

	@GetMapping("/phone-detail/{id}")
	PhoneTypeDto getPhone(@PathVariable Long id) {
		System.out.println("hahaahhahaha");
		System.out.println(id);
		PhoneType phoneType = phoneTypeDao.findById(id);
		PhoneTypeDto phoneTypeDto = modelMapper.map(phoneType, PhoneTypeDto.class);
		System.out.println(phoneTypeDto);
		Type listType = new TypeToken<List<PhoneDto>>() {
		}.getType();
		phoneTypeDto.setPhoneDtos(modelMapper.map(phoneType.getPhones(), listType));
		return phoneTypeDto;
	}
	
	@GetMapping("/phone-detail")
	List<PhoneImportDto> getAllPhone() {
		List<PhoneType> phoneTypes = phoneTypeDao.findAllPhone();
		Type listType = new TypeToken<List<PhoneImportDto>>() {
		}.getType();
		List<PhoneImportDto> phoneImportDtos = modelMapper.map(phoneTypes, listType);
		int length = phoneImportDtos.size();
		for(int i = 0; i < length; i++) {
			List<Phone> phones = phoneTypes.get(i).getPhones();
			for(Phone phone: phones) {
				phone.setPhoneType(null);
			}
			phoneImportDtos.get(i).setPhones(phones);
		}
		
		return phoneImportDtos;
	}
	
	
	@PostMapping("/phone-type-file")
	List<String> postImagePhone(@RequestParam("files") MultipartFile[] files) {
		System.out.println("*************************");
		System.out.println(files.length);
		//System.out.println(value);
		return fileService.uploadFile(files);
	}
	
	@PostMapping("/phone-type")
	Long postPhoneType(@RequestBody CreatePhoneTypeDto createPhoneTypeDto) {
		System.out.println("*************************");
		System.out.println(createPhoneTypeDto);
		PhoneType phoneType = modelMapper.map(createPhoneTypeDto, PhoneType.class);
		
		Type listType = new TypeToken<List<Phone>>() {
		}.getType();
		List<Phone> phones = modelMapper.map(createPhoneTypeDto.getCreatePhoneDtos(), listType);
		phoneType.setPhones(phones);
		for(Phone phone: phones) {
			phone.setPhoneType(phoneType);
		}
		System.out.println(phoneType);
		phoneTypeDao.savePhoneType(phoneType);
		return 1L;
	}
	
	@DeleteMapping("/phone-type/{id}")
	Long deletePhoneType(@PathVariable Long id) {
		phoneTypeDao.deletePhoneTypeById(id);
		return 1L;
	}

}
