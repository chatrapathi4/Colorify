package com.colorify.colorify;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.awt.image.BufferedImage;
import java.awt.Color;
import javax.imageio.ImageIO;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageColorController {

    @PostMapping("/extract-colors")
    public Map<String, Object> extractColorsFromImage(@RequestParam("image") MultipartFile file) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (file.isEmpty()) {
                response.put("error", "No image file provided");
                return response;
            }

            BufferedImage image = ImageIO.read(file.getInputStream());
            if (image == null) {
                response.put("error", "Invalid image format");
                return response;
            }

            List<Map<String, Object>> extractedColors = extractDominantColors(image);
            response.put("colors", extractedColors);
            response.put("imageInfo", getImageInfo(image));
            response.put("message", "Colors extracted successfully");

        } catch (IOException e) {
            response.put("error", "Error processing image: " + e.getMessage());
        } catch (Exception e) {
            response.put("error", "Unexpected error: " + e.getMessage());
        }

        return response;
    }

    @PostMapping("/analyze-color-at-point")
    public Map<String, Object> analyzeColorAtPoint(
            @RequestParam("image") MultipartFile file,
            @RequestParam("x") int x,
            @RequestParam("y") int y) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            BufferedImage image = ImageIO.read(file.getInputStream());
            if (image == null) {
                response.put("error", "Invalid image format");
                return response;
            }

            if (x >= 0 && x < image.getWidth() && y >= 0 && y < image.getHeight()) {
                int rgb = image.getRGB(x, y);
                Color color = new Color(rgb);
                
                String hexColor = String.format("#%02X%02X%02X", 
                    color.getRed(), color.getGreen(), color.getBlue());
                
                Map<String, Object> colorInfo = new HashMap<>();
                colorInfo.put("hex", hexColor);
                colorInfo.put("rgb", Map.of(
                    "r", color.getRed(),
                    "g", color.getGreen(),
                    "b", color.getBlue()
                ));
                colorInfo.put("position", Map.of("x", x, "y", y));
                
                response.put("color", colorInfo);
                response.put("message", "Color extracted at point (" + x + ", " + y + ")");
            } else {
                response.put("error", "Coordinates out of image bounds");
            }

        } catch (Exception e) {
            response.put("error", "Error analyzing image: " + e.getMessage());
        }

        return response;
    }

    private List<Map<String, Object>> extractDominantColors(BufferedImage image) {
        Map<String, Integer> colorCount = new HashMap<>();
        int totalPixels = 0;
        
        // Sample every 10th pixel for performance
        int step = Math.max(1, Math.min(image.getWidth(), image.getHeight()) / 100);
        
        for (int x = 0; x < image.getWidth(); x += step) {
            for (int y = 0; y < image.getHeight(); y += step) {
                int rgb = image.getRGB(x, y);
                Color color = new Color(rgb);
                
                // Group similar colors together
                String hexColor = quantizeColor(color);
                colorCount.put(hexColor, colorCount.getOrDefault(hexColor, 0) + 1);
                totalPixels++;
            }
        }

        // Sort by frequency and return top colors
        List<Map.Entry<String, Integer>> sortedColors = colorCount.entrySet()
            .stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
            .limit(10)
            .toList();

        List<Map<String, Object>> dominantColors = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : sortedColors) {
            Map<String, Object> colorInfo = createColorInfo(entry.getKey());
            colorInfo.put("frequency", (double) entry.getValue() / totalPixels);
            colorInfo.put("percentage", String.format("%.1f%%", 
                ((double) entry.getValue() / totalPixels) * 100));
            dominantColors.add(colorInfo);
        }

        return dominantColors;
    }

    private String quantizeColor(Color color) {
        // Quantize colors to reduce similar colors
        int r = (color.getRed() / 16) * 16;
        int g = (color.getGreen() / 16) * 16;
        int b = (color.getBlue() / 16) * 16;
        return String.format("#%02X%02X%02X", r, g, b);
    }

    private Map<String, Object> createColorInfo(String hexColor) {
        Map<String, Object> colorInfo = new HashMap<>();
        colorInfo.put("hex", hexColor);
        
        // Convert hex to RGB
        int r = Integer.valueOf(hexColor.substring(1, 3), 16);
        int g = Integer.valueOf(hexColor.substring(3, 5), 16);
        int b = Integer.valueOf(hexColor.substring(5, 7), 16);
        
        colorInfo.put("rgb", Map.of("r", r, "g", g, "b", b));
        colorInfo.put("name", getColorName(hexColor));
        
        return colorInfo;
    }

    private Map<String, Object> getImageInfo(BufferedImage image) {
        Map<String, Object> info = new HashMap<>();
        info.put("width", image.getWidth());
        info.put("height", image.getHeight());
        info.put("type", getImageType(image.getType()));
        return info;
    }

    private String getImageType(int type) {
        return switch (type) {
            case BufferedImage.TYPE_INT_RGB -> "RGB";
            case BufferedImage.TYPE_INT_ARGB -> "ARGB";
            case BufferedImage.TYPE_BYTE_GRAY -> "Grayscale";
            default -> "Other";
        };
    }

    private String getColorName(String hex) {
        // Simple color name mapping
        Map<String, String> colorNames = new HashMap<>();
        colorNames.put("#FF0000", "Red");
        colorNames.put("#00FF00", "Green");
        colorNames.put("#0000FF", "Blue");
        colorNames.put("#FFFF00", "Yellow");
        colorNames.put("#FF00FF", "Magenta");
        colorNames.put("#00FFFF", "Cyan");
        colorNames.put("#000000", "Black");
        colorNames.put("#FFFFFF", "White");
        colorNames.put("#808080", "Gray");
        
        return colorNames.getOrDefault(hex.toUpperCase(), "Custom Color");
    }
}