package com.groceMart.utils.exception;

public class ApplicationException extends Exception{


	public ApplicationException(Exception e) {
		super(e);
	}

	public ApplicationException(Throwable t) {
		super(t);
	}

	public ApplicationException(String message) {
		super(message);
	}

	public ApplicationException(String message, Exception e) {
		super(message, e);
	}
	
	public ApplicationException(String message, Throwable t) {
		super(message, t);
	}
}
