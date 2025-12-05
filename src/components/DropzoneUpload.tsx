import { Box, Typography, Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

interface DropzoneUploadProps {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DropzoneUpload = ({ onFileSelect }: DropzoneUploadProps) => {
  return (
    <Box
      sx={{
        border: "3px dashed #FFD700",
        borderRadius: 4,
        p: 8,
        textAlign: "center",
        background:
          "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(30, 30, 30, 0.9) 100%)",
        backdropFilter: "blur(20px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background:
            "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1), transparent)",
          animation: "rotate 4s linear infinite",
          opacity: 0,
          transition: "opacity 0.3s",
        },
        "&:hover": {
          borderColor: "#FF6B6B",
          background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(40, 40, 40, 0.95) 100%)",
          transform: "translateY(-4px) scale(1.02)",
          boxShadow: "0 20px 40px rgba(255, 107, 107, 0.3)",
          "&:before": {
            opacity: 1,
          },
        },
        cursor: "pointer",
        "@keyframes rotate": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(45deg, #FF6B6B, #4ECDC4)",
          borderRadius: "50%",
          p: 2,
          display: "inline-flex",
          mb: 3,
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
        }}
      >
        <CloudUpload sx={{ fontSize: 48, color: "white" }} />
      </Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          background: "linear-gradient(45deg, #FFD700, #FF6B6B)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 800,
          mb: 1,
        }}
      >
        ✨ Click or drag image here
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#4ECDC4",
          mb: 4,
          fontWeight: 600,
        }}
      >
        Upload an Instagram screenshot (.jpg, .jpeg, .png)
      </Typography>
      <input
        accept=".jpg,.jpeg,.png"
        style={{ display: "none" }}
        id="file-upload"
        type="file"
        onChange={onFileSelect}
      />
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUpload />}
          sx={{
            borderRadius: 3,
            px: 4,
            py: 2,
            fontWeight: 700,
            fontSize: "1.1rem",
            background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
            "&:hover": {
              background: "linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)",
              boxShadow: "0 12px 35px rgba(102, 126, 234, 0.4)",
              transform: "translateY(-2px)",
            },
          }}
        >
          🎯 Choose File
        </Button>
      </label>
    </Box>
  );
};

export default DropzoneUpload;
