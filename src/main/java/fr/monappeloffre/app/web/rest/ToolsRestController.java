package fr.monappeloffre.app.web.rest;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.monappeloffre.app.domain.Customer;
import fr.monappeloffre.app.domain.Project;
import fr.monappeloffre.app.domain.ProjectPic;
import fr.monappeloffre.app.domain.Provider;
import fr.monappeloffre.app.domain.User;
import fr.monappeloffre.app.repository.CustomerRepository;
import fr.monappeloffre.app.repository.ProjectPicRepository;
import fr.monappeloffre.app.repository.ProjectRepository;
import fr.monappeloffre.app.repository.ProviderRepository;
import fr.monappeloffre.app.repository.UserRepository;
import fr.monappeloffre.app.security.SecurityUtils;



@RestController
@RequestMapping(path="/api/tools")
public class ToolsRestController {

	private static Logger log = LoggerFactory.getLogger(ToolsRestController.class);

	@Autowired
	CustomerRepository customerRepository;
	@Autowired
	ProviderRepository providerRepository;
	@Autowired
	UserRepository userRepository;


	@GetMapping(path="/role")

	public List<String> getRole() {
		//log.info("uploading file");
		//@RequestPart("file") MultipartFile file) {
		List<String> retour = new ArrayList<>();

		User currentUserLogged;
		Long idUser = 1l;
		Optional<User> optional = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin());
		if (optional.isPresent()) {
			currentUserLogged = optional.get();
			idUser = currentUserLogged.getId();

			Optional<Customer> customer = customerRepository.findByidUser(idUser);
			retour.add(customer.isPresent() ? "customer" : "");

			Optional<Provider> provider = providerRepository.findByidUser(idUser);
			retour.add(provider.isPresent() ? "provider" : "");
			
			retour.removeAll(Arrays.asList("", null));

		}

		return retour;
	}



}