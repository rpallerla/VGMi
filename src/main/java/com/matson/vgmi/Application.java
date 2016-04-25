package com.matson.haz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.orm.jpa.EntityScan;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * 
 * @author DTownsend
 * 
 *         Setup Object
 * 
 */
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})
@Configuration 
@ComponentScan(basePackages = "com.matson")
//@EntityScan(basePackages={"com.matson.gems.model","com.matson.vgmi.model"})
@EntityScan(basePackages={"com.matson.vgmi.model"})
@EnableCaching
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("undetails");
    }
}
