package com.notes;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Base64;

public class SecretKeyGenerator {
    public static void main(String[] args) throws Exception {
        KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
        keyGen.init(256);
        SecretKey key = keyGen.generateKey();
        String base64Key = Base64.getEncoder().encodeToString(key.getEncoded());
        System.out.println("Your secret key: " + base64Key);
    }
}
