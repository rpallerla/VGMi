package com.matson.vgmi.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import com.matson.haz.Application;

/**
 * 
 * @author DTownsend
 * 
 * Configuration JBOSS Specific and web-app
 *
 */
public class WebConfig extends SpringBootServletInitializer {

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
    return application.sources(Application.class);
  }

  /**
   * Required mappings for JBOSS EAP 6.3.x
   *
   * @param container
   * @throws ServletException
   */
  @Override
  public void onStartup(ServletContext container) throws ServletException {
    WebApplicationContext context = getContext();

    ServletRegistration.Dynamic registration = container.addServlet("dispatcher", new DispatcherServlet(context));
    registration.setLoadOnStartup(1);
    registration.addMapping("/*"); // required JBOSS EAP 6.3.x GA
    super.onStartup(container);
  }

  private WebApplicationContext getContext() {
    AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
    context.setConfigLocation(Application.class.getName());
    return context;
  }
}
