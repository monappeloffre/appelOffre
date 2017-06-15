package fr.monappeloffre.app.web.rest;

import java.io.File;
import java.time.LocalDate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.monappeloffre.app.domain.Project;
import fr.monappeloffre.app.domain.ProjectPic;
import fr.monappeloffre.app.repository.ProjectPicRepository;
import fr.monappeloffre.app.repository.ProjectRepository;


@RestController
@RequestMapping(path="/api/content")
public class ContentRestController {

	private static Logger log = LoggerFactory.getLogger(ContentRestController.class);
	
	@Autowired
	ProjectPicRepository projetPicRepository;
	@Autowired
	ProjectRepository projetRepository;
	
	

public static class ImageData {
public String fileName;
public byte[] data;
}
	@RequestMapping(
			path="/imagesProjet",
			//method=RequestMethod.GET, 
			//name="/images"
			//?? consumes="multipart/form-data"
			method=RequestMethod.POST,
			consumes = {"multipart/form-data"})
			
	public void uploadImages(@RequestParam("file") MultipartFile file //, @RequestParam("project") Project project
			) {
		//log.info("uploading file");
	    //@RequestPart("file") MultipartFile file) {
		ProjectPic photo = new ProjectPic();
		Project projet = projetRepository.findOne(1l);
		
		try {
			File destinationFichier = new File(System.getProperty("user.dir")+"/src/main/webapp/content/images/"+file.getOriginalFilename());
			log.info("Dir to save: "+destinationFichier);
			file.transferTo(destinationFichier);
			photo.setLink("content/images/" + file.getOriginalFilename());
			photo.setProjectPIC(projet);
			projetPicRepository.save(photo);
		} catch (Exception ex) {
			log.error("Failed to upload", ex);
		}
		
	}
	
	
	
}