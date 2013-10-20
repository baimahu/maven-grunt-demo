package com.caineng.demo;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.context.ServletContextAware;

public class WebAppInitializeBean implements ServletContextAware {

	private final static String ENV_DEV = "dev"; 
	private final static String ENV_PROD= "prod";
	
	@Value("${main-url}")
	private String baseUrl;
	
	/**
	 * environment
	 */
	@Value("${env}")
	private String env = ENV_PROD;
	
	@Override
	public void setServletContext(ServletContext context) {
		
		//Base project webapp uri
 		context.setAttribute("baseUrl", baseUrl);
 		
 		//settings
 		boolean isDev = false;
 		if(ENV_DEV.equalsIgnoreCase(env)){
 			isDev = true;
 		}
 		context.setAttribute("devEnv", isDev);
 		
	}
	
}
