package phonestore.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {

    @Value("${app.upload.dir:${user.home}}")
    public String uploadDir;

    public List<String> uploadFile(MultipartFile[] files) {
    	String uploadDirectory = "C:\\Users\\Luong Manh Dat\\Desktop\\Project II React\\projectII\\public\\images\\phones";
    	List<String> fileNames = new ArrayList<String>();
    	for(MultipartFile file: files ) {
    		try {
    			String fileName = new Date().getTime() + StringUtils.cleanPath(file.getOriginalFilename());
                Path copyLocation = Paths
                    .get(uploadDirectory + File.separator + fileName);
                Files.copy(file.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
                System.out.println("path.............");
                System.out.println(copyLocation);
                fileNames.add(fileName);
            } catch (Exception e) {
                e.printStackTrace();
                throw new FileStorageException("Could not store file " + file.getOriginalFilename()
                    + ". Please try again!");
            }
    	}
    	
        return fileNames;
    }
}