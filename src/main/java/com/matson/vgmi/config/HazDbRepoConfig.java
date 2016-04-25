/**
 * 
 */
package com.matson.vgmi.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.lookup.JndiDataSourceLookup;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @author nsalbarde
 *
 */
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
		entityManagerFactoryRef = "hazEntityManagerFactory",
		transactionManagerRef = "hazTransactionManager",
        basePackages = {"com.matson.haz.dao"})
public class HazDbRepoConfig {

    @Value("${haz.datasource.hibernate.dialect}")
    private String dialect;
    
    @Value("${spring.jpa.show-sql}")
    private boolean jspShowSQLFlag;
    
    @Value("${haz.datasource.jndi-name}")
    private String hazDataSourceJNDIName;

    @Bean
    @Primary
    public DataSource hazDataSource() {
    	final JndiDataSourceLookup dsLookup = new JndiDataSourceLookup();
        dsLookup.setResourceRef(true);
        return dsLookup.getDataSource(hazDataSourceJNDIName);
    }

    @Bean
    @Primary    
    public LocalContainerEntityManagerFactoryBean hazEntityManagerFactory() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(hazDataSource());
        em.setPackagesToScan("com.matson.haz.model");        
        em.setJpaVendorAdapter(getJpaVendorAdapter());
        em.setJpaProperties(additionalProperties());
        return em;
    }
    
    Properties additionalProperties() {
        Properties properties = new Properties();
        properties.setProperty("hibernate.dialect", dialect);
        return properties;
    }
    
    JpaVendorAdapter getJpaVendorAdapter(){
    	HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
    	vendorAdapter.setDatabase(Database.MYSQL);
        vendorAdapter.setShowSql(jspShowSQLFlag);
        return vendorAdapter;
    }
    
    @Bean
    PlatformTransactionManager hazTransactionManager() {
      return new JpaTransactionManager(hazEntityManagerFactory().getObject());
    }
    
}