package com.company.authservice.security;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Collections;
import java.util.List;


@Component
public class JwtFilter extends OncePerRequestFilter {


    private final String SECRET =
            "my-super-secret-key-for-jwt-authentication-2026-extra-secure-long-key-123456789-VERY-LONG-SECRET-KEY-FOR-HS512-SECURITY-EXTRA-CHARS-1234567890";

    // ✅ All public paths — no JWT needed
    private static final List<String> PUBLIC_PATHS = List.of(
            "/auth/register",
            "/auth/login",
            "/auth/send-otp",
            "/auth/verify-otp"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {


        String path = request.getServletPath();


        // ✅ Skip JWT for all public paths
        boolean isPublic = PUBLIC_PATHS.stream().anyMatch(p -> path.equals(p));
        if (isPublic) {
            filterChain.doFilter(request, response);
            return;
        }


        // 🔒 Protected paths — require valid JWT
        String authHeader = request.getHeader("Authorization");


        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Missing Authorization header");
            return;
        }


        try {
            String token = authHeader.substring(7);


            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(SECRET.getBytes()))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();


            String username = claims.getSubject();
            String role = claims.get("role", String.class);


            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                            username, null,
                            Collections.singletonList(
                                    new SimpleGrantedAuthority("ROLE_" + role)
                            )
                    );
            SecurityContextHolder.getContext().setAuthentication(auth);


        } catch (Exception e) {
            System.out.println("❌ Invalid JWT: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid or expired token");
            return;
        }


        filterChain.doFilter(request, response);
    }
}
