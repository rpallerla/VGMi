package com.matson.vgmi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * 
 * @author Sameer Shukla
 *
 */
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

	@Override
	public void configureDefaultServletHandling(
			DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}

	@Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("login");
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/freightDetails").setViewName("freightDetails");
        registry.addViewController("/search").setViewName("search");
        registry.addViewController("/dcmTemplate").setViewName("dcmTemplate");
        registry.addViewController("/dcmReport").setViewName("dcmReport");
    }

	/**
	 * To make sure that server should always returns json rather html's...
	 * Nice way to deal with Content Negotiation...
	 */
	@Override
	  public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
	    configurer.defaultContentType(MediaType.APPLICATION_JSON);
	  }

}
