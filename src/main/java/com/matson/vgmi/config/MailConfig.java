/**
 * 
 */
package com.matson.vgmi.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

/**
 * @author nsalbarde
 *
 */
@Configuration
public class MailConfig {

	@Value("${spring.mail.host}")
	private String mailHost;

	@Value("${spring.mail.port}")
	private Integer mailPort;

	@Value("${spring.mail.properties.mail.smtp.timeout}")
	private String smtpTimeout;

	@Value("${spring.mail.properties.mail.smtp.connectiontimeout}")
	private String smtpConnTimeout;
	
	@Bean
	public JavaMailSender getJavaMailSenderImpl() {
		JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
		javaMailSender.setHost(mailHost);
		javaMailSender.setPort(mailPort);
		javaMailSender.setJavaMailProperties(getMailProperties());
		return javaMailSender;
	}

	private Properties getMailProperties() {
		Properties properties = new Properties();
		properties.setProperty("mail.smtp.timeout", smtpTimeout);
		properties.setProperty("mail.smtp.connectiontimeout", smtpConnTimeout);
		return properties;
	}
}
