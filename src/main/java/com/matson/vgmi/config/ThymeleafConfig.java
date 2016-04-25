package com.matson.vgmi.config;

import org.springframework.context.annotation.Bean;
import org.thymeleaf.extras.springsecurity3.dialect.SpringSecurityDialect;

/**
 * Provides the SpringSecurity dialect to our Template Engine so that we can
 * use the sec:* attributes and special" expression utility objects:
 * i.e ${#authentication.name} or sec:authentication="name"
 *
 * @author Dave Townsend
 */
public class ThymeleafConfig {

  @Bean
  public SpringSecurityDialect springSecurityDialect(){
    return new SpringSecurityDialect();
  }
}