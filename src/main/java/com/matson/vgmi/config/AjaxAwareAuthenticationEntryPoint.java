package com.matson.vgmi.config;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

@Component
public class AjaxAwareAuthenticationEntryPoint implements Filter {

	String[] skipURI = { "resources", "login" };

	private boolean isValidUrl(String url) {
		boolean isValid = true;
		for (String string : skipURI) {
			if (url.contains(string)) {
				isValid = false;
				break;
			}
		}
		return isValid;
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {

		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		if (isValidUrl(request.getRequestURI())) {
			String requestedWithHeader = request.getHeader("X-Requested-With");

			boolean isAjax = "XMLHttpRequest".equals(requestedWithHeader);
			
			if (isAjax && request.getRequestedSessionId() != null &&
						  !request.isRequestedSessionIdValid()) {
				 response.sendError(HttpServletResponse.SC_PRECONDITION_FAILED,
				 "SESSION_TIMED_OUT");
				return;
			} else {
				chain.doFilter(request, response);
			}
		}else {
			chain.doFilter(request, response);
		}
	}

	@Override
	public void destroy() {
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

}