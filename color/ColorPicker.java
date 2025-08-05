import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import java.io.File;
import java.awt.datatransfer.StringSelection;
import java.awt.datatransfer.Clipboard;

public class ColorPicker extends JFrame {
    private BufferedImage originalImage;
    private BufferedImage scaledImage;
    private JPanel colorPreview;
    private JLabel hexLabel, rgbLabel;
    private String currentHex = "#------";
    private boolean isLocked = false; // Add this field to your class

    public ColorPicker() throws Exception {
        setTitle("Color Picker App");
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setSize(900, 600);

        // Set background color to match body
        getContentPane().setBackground(new Color(0xf9f9f9));

        // Header
        JLabel header = new JLabel("Color Picker App", SwingConstants.CENTER);
        header.setFont(new Font("Segoe UI", Font.BOLD, 20));
        header.setOpaque(true);
        header.setBackground(new Color(0x32a899));
        header.setForeground(Color.WHITE);
        header.setPreferredSize(new Dimension(0, 50));
        add(header, BorderLayout.NORTH);

        // Load original image
        originalImage = ImageIO.read(new File("E:\\sem 3\\oops\\color project\\color\\shadowarmy.jpg"));

        // Scale the image once and keep it
        int imagePanelWidth = 800;
        int imagePanelHeight = 600;
        scaledImage = getScaledImage(originalImage, imagePanelWidth, imagePanelHeight);

        // Image label
        JLabel imageLabel = new JLabel(new ImageIcon(scaledImage));
        imageLabel.setHorizontalAlignment(JLabel.CENTER);

        // Image panel with white background, border radius, and shadow
        JPanel imagePanel = new JPanel(new BorderLayout()) {
            @Override
            protected void paintComponent(Graphics g) {
                super.paintComponent(g);
                // Draw subtle shadow
                Graphics2D g2 = (Graphics2D) g;
                g2.setColor(new Color(0,0,0,20));
                g2.fillRoundRect(5, 5, getWidth()-10, getHeight()-10, 16, 16);
            }
        };
        imagePanel.setBackground(Color.WHITE);
        imagePanel.setBorder(BorderFactory.createEmptyBorder(16, 16, 16, 16));
        imagePanel.setOpaque(false);
        imagePanel.add(imageLabel, BorderLayout.CENTER);

        // Info panel
        JPanel infoPanel = new JPanel();
        infoPanel.setLayout(new BoxLayout(infoPanel, BoxLayout.Y_AXIS));
        infoPanel.setBackground(Color.WHITE);
        infoPanel.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createEmptyBorder(16, 16, 16, 16),
            BorderFactory.createLineBorder(new Color(0xe0e0e0), 1)
        ));

        colorPreview = new JPanel();
        colorPreview.setPreferredSize(new Dimension(100, 100));
        colorPreview.setMaximumSize(new Dimension(200, 200));
        colorPreview.setBackground(new Color(0xcccccc));
        colorPreview.setBorder(BorderFactory.createLineBorder(Color.LIGHT_GRAY, 1, true)); // rounded border

        // For HEX label
        hexLabel = new JLabel("HEX: #------");
        hexLabel.setFont(new Font("Segoe UI", Font.PLAIN, 16));
        hexLabel.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(new Color(0xe0e0e0), 5, true), // rounded border
            BorderFactory.createEmptyBorder(6, 12, 6, 12) // padding
        ));

        // For RGB label
        rgbLabel = new JLabel("RGB: --, --, --");
        rgbLabel.setFont(new Font("Segoe UI", Font.PLAIN, 16));
        rgbLabel.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(new Color(0xe0e0e0), 3, true), // rounded border
            BorderFactory.createEmptyBorder(6, 12, 6, 12) // padding
        ));

        JButton copyHexButton = new JButton("Copy HEX");
        copyHexButton.setBackground(new Color(0x32a899));
        copyHexButton.setForeground(Color.WHITE);
        copyHexButton.setFocusPainted(false);
        copyHexButton.setFont(new Font("Segoe UI", Font.BOLD, 14));
        copyHexButton.setBorder(BorderFactory.createEmptyBorder(8, 16, 8, 16));
        copyHexButton.setCursor(new Cursor(Cursor.HAND_CURSOR));
        // Button hover effect
        copyHexButton.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                copyHexButton.setBackground(new Color(0x2c927f));
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                copyHexButton.setBackground(new Color(0x32a899));
            }
        });
        copyHexButton.addActionListener(e -> {
            StringSelection selection = new StringSelection(currentHex);
            Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
            clipboard.setContents(selection, null);
            JOptionPane.showMessageDialog(this, "HEX copied: " + currentHex);
            isLocked = false; // Unlock updates
        });

        infoPanel.add(colorPreview);
        infoPanel.add(Box.createVerticalStrut(10));
        infoPanel.add(hexLabel);
        infoPanel.add(Box.createVerticalStrut(5));
        infoPanel.add(rgbLabel);
        infoPanel.add(Box.createVerticalStrut(10));
        infoPanel.add(copyHexButton);

        // JSplitPane for 60:40 split
        JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, imagePanel, infoPanel);
        splitPane.setDividerLocation(0.6);
        splitPane.setResizeWeight(0.6);
        splitPane.setBorder(null);
        add(splitPane, BorderLayout.CENTER);

        // Footer
        JLabel footer = new JLabel("\u00A9 2025 Color Picker App", SwingConstants.CENTER);
        footer.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        footer.setOpaque(true);
        footer.setBackground(new Color(0xeeeeee));
        footer.setPreferredSize(new Dimension(0, 30));
        add(footer, BorderLayout.SOUTH);

        // Mouse listener: pick color from the scaled image directly
        imageLabel.addMouseMotionListener(new MouseMotionAdapter() {
            public void mouseMoved(MouseEvent e) {
                if (!isLocked) {
                    int x = e.getX();
                    int y = e.getY();
                    double scaleX = (double) originalImage.getWidth() / imageLabel.getWidth();
                    double scaleY = (double) originalImage.getHeight() / imageLabel.getHeight();
                    int imgX = (int) (x * scaleX);
                    int imgY = (int) (y * scaleY);
                    if (imgX >= 0 && imgY >= 0 && imgX < originalImage.getWidth() && imgY < originalImage.getHeight()) {
                        int rgb = originalImage.getRGB(imgX, imgY);
                        Color color = new Color(rgb, true);
                        currentHex = String.format("#%02X%02X%02X", color.getRed(), color.getGreen(), color.getBlue());
                        colorPreview.setBackground(color);
                        hexLabel.setText("HEX: " + currentHex);
                        rgbLabel.setText("RGB: " + color.getRed() + ", " + color.getGreen() + ", " + color.getBlue());
                    }
                }
            }
        });

        imageLabel.addMouseListener(new MouseAdapter() {
            public void mouseClicked(MouseEvent e) {
                int x = e.getX();
                int y = e.getY();
                double scaleX = (double) originalImage.getWidth() / imageLabel.getWidth();
                double scaleY = (double) originalImage.getHeight() / imageLabel.getHeight();
                int imgX = (int) (x * scaleX);
                int imgY = (int) (y * scaleY);
                if (imgX >= 0 && imgY >= 0 && imgX < originalImage.getWidth() && imgY < originalImage.getHeight()) {
                    int rgb = originalImage.getRGB(imgX, imgY);
                    Color color = new Color(rgb, true);
                    currentHex = String.format("#%02X%02X%02X", color.getRed(), color.getGreen(), color.getBlue());
                    colorPreview.setBackground(color);
                    hexLabel.setText("HEX: " + currentHex);
                    rgbLabel.setText("RGB: " + color.getRed() + ", " + color.getGreen() + ", " + color.getBlue());
                    isLocked = true; // Lock updates
                }
            }
        });

        setLocationRelativeTo(null); // Center the window
        setVisible(true);
    }

    private BufferedImage getScaledImage(BufferedImage srcImg, int w, int h) {
        BufferedImage resizedImg = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2 = resizedImg.createGraphics();
        g2.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g2.drawImage(srcImg, 0, 0, w, h, null);
        g2.dispose();
        return resizedImg;
    }

    public static void main(String[] args) throws Exception {
        new ColorPicker();
    }
}
