package com.company.authservice.security;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;


import java.security.Key;
import java.util.Date;
@Component
public class JwtUtil {
    // ✅ Must be same secret as JwtFilter
    private final String SECRET =
            "my-super-secret-key-for-jwt-authentication-2026-extra-secure-long-key-123456789-VERY-LONG-SECRET-KEY-FOR-HS512-SECURITY-EXTRA-CHARS-1234567890";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());


    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(
                        System.currentTimeMillis() + 1000L * 60 * 60 * 24)) // 24 hours
                .signWith(key)
                .compact();
    }


    // ✅ Added missing methods
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }


    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }


    public boolean validateToken(String token) {
        try {
            Claims claims = extractClaims(token);
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }


    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
