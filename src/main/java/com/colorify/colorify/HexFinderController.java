package com.colorify.colorify;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/hex")
@CrossOrigin(origins = "http://localhost:3000")
public class HexFinderController {

    @GetMapping("/random")
    public Map<String, Object> getRandomHexColor() {
        String hexColor = generateRandomHex();
        return createColorResponse(hexColor);
    }

    @GetMapping("/validate/{hex}")
    public Map<String, Object> validateHexColor(@PathVariable String hex) {
        Map<String, Object> response = new HashMap<>();
        
        if (isValidHex(hex)) {
            response.put("valid", true);
            response.put("hex", formatHex(hex));
            response.put("rgb", hexToRgb(hex));
            response.put("message", "Valid HEX color");
        } else {
            response.put("valid", false);
            response.put("message", "Invalid HEX color format");
        }
        
        return response;
    }

    @PostMapping("/convert")
    public Map<String, Object> convertRgbToHex(@RequestBody Map<String, Integer> rgb) {
        try {
            int r = rgb.get("r");
            int g = rgb.get("g");
            int b = rgb.get("b");
            
            if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
                throw new IllegalArgumentException("RGB values must be between 0 and 255");
            }
            
            String hexColor = rgbToHex(r, g, b);
            return createColorResponse(hexColor);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Invalid RGB values: " + e.getMessage());
            return response;
        }
    }

    @GetMapping("/palette/{baseHex}")
    public Map<String, Object> generatePalette(@PathVariable String baseHex) {
        Map<String, Object> response = new HashMap<>();
        
        if (!isValidHex(baseHex)) {
            response.put("error", "Invalid HEX color");
            return response;
        }
        
        List<Map<String, Object>> palette = new ArrayList<>();
        String formattedHex = formatHex(baseHex);
        
        // Add base color
        palette.add(createColorResponse(formattedHex));
        
        // Generate complementary colors
        palette.add(createColorResponse(getComplementaryColor(formattedHex)));
        
        // Generate analogous colors
        palette.addAll(getAnalogousColors(formattedHex));
        
        response.put("baseColor", formattedHex);
        response.put("palette", palette);
        
        return response;
    }

    // Helper methods
    private String generateRandomHex() {
        Random random = new Random();
        return String.format("#%06x", random.nextInt(0xffffff + 1));
    }

    private boolean isValidHex(String hex) {
        if (hex == null) return false;
        String cleanHex = hex.startsWith("#") ? hex.substring(1) : hex;
        return cleanHex.matches("^[0-9A-Fa-f]{6}$");
    }

    private String formatHex(String hex) {
        String cleanHex = hex.startsWith("#") ? hex.substring(1) : hex;
        return "#" + cleanHex.toUpperCase();
    }

    private Map<String, Integer> hexToRgb(String hex) {
        String cleanHex = hex.startsWith("#") ? hex.substring(1) : hex;
        Map<String, Integer> rgb = new HashMap<>();
        rgb.put("r", Integer.valueOf(cleanHex.substring(0, 2), 16));
        rgb.put("g", Integer.valueOf(cleanHex.substring(2, 4), 16));
        rgb.put("b", Integer.valueOf(cleanHex.substring(4, 6), 16));
        return rgb;
    }

    private String rgbToHex(int r, int g, int b) {
        return String.format("#%02X%02X%02X", r, g, b);
    }

    private Map<String, Object> createColorResponse(String hexColor) {
        Map<String, Object> response = new HashMap<>();
        response.put("hex", hexColor);
        response.put("rgb", hexToRgb(hexColor));
        response.put("name", getColorName(hexColor));
        return response;
    }

    private String getColorName(String hex) {
        Map<String, String> colorNames = new HashMap<>();
        colorNames.put("#FF0000", "Red");
        colorNames.put("#00FF00", "Green");
        colorNames.put("#0000FF", "Blue");
        colorNames.put("#FFFF00", "Yellow");
        colorNames.put("#FF00FF", "Magenta");
        colorNames.put("#00FFFF", "Cyan");
        colorNames.put("#000000", "Black");
        colorNames.put("#FFFFFF", "White");
        
        return colorNames.getOrDefault(hex.toUpperCase(), "Custom Color");
    }

    private String getComplementaryColor(String hex) {
        Map<String, Integer> rgb = hexToRgb(hex);
        int r = 255 - rgb.get("r");
        int g = 255 - rgb.get("g");
        int b = 255 - rgb.get("b");
        return rgbToHex(r, g, b);
    }

    private List<Map<String, Object>> getAnalogousColors(String hex) {
        List<Map<String, Object>> analogous = new ArrayList<>();
        Map<String, Integer> rgb = hexToRgb(hex);
        
        for (int i = 1; i <= 3; i++) {
            int shift = i * 30;
            int r = Math.min(255, Math.max(0, rgb.get("r") + shift));
            int g = Math.min(255, Math.max(0, rgb.get("g") + shift/2));
            int b = Math.min(255, Math.max(0, rgb.get("b") - shift/3));
            analogous.add(createColorResponse(rgbToHex(r, g, b)));
        }
        
        return analogous;
    }
}
