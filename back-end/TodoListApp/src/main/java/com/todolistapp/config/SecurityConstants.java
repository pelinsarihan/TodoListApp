package com.todolistapp.config;

public class SecurityConstants {
    public static final String SECRET = "WebApp";
    public static final long EXPIRATION_TIME = 432_000_000; // 5 gün
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
}
