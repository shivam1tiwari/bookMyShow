import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import { Delete, Cancel, AddAPhoto } from '@mui/icons-material';
import { useMutation, useQuery, ApolloError } from '@apollo/client';
import { UPLOAD_BANNER, GET_BANNERS, DELETE_BANNER } from '../../queries/queries';
import Compressor from 'compressorjs';
import './AdminBanner.css';
import { IBanner, IDeleteBannerData, IDeleteBannerVars, IUploadBannerData, IUploadBannerVars } from '../../type';
/**
 * AdminBanner Component
 * 
 * A component for managing the banners in the admin panel. It allows the user to upload new banners, 
 * preview images before uploading, and delete existing banners. The banners are displayed in a table format
 * with options to delete them.
 * 
 * @returns {JSX.Element} The AdminBanner component that provides the functionality for managing banners.
 */
const AdminBanner: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { loading, error, data } = useQuery<{ getBanners: IBanner[] }>(GET_BANNERS);
  const [uploadBanner] = useMutation<IUploadBannerData, IUploadBannerVars>(UPLOAD_BANNER);
  const [deleteBanner] = useMutation<IDeleteBannerData, IDeleteBannerVars>(DELETE_BANNER);
  /**
   * Handles image selection and compression when a user selects an image for uploading.
   * 
   * @param {ChangeEvent<HTMLInputElement>} e - The file input change event.
   */
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Compress the image 
      new Compressor(file, {
        quality: 0.6,
        success(compressedFile) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(compressedFile);
        },
        error(err) {
          console.error('Error compressing image:', err);
        },
      });
    }
  };
 /**
   * Handles the banner upload functionality. It uploads the selected image to the server
   * and refetches the banner data after a successful upload.
   */
  const handleUpload = () => {
    if (selectedImage && preview) {
      const uploadDate = new Date().toLocaleDateString();
      uploadBanner({
        variables: {
          name: selectedImage.name,
          url: preview,
          uploadDate
        },
        refetchQueries: [{ query: GET_BANNERS }]
      })
        .then(() => handleCancel())
        .catch((error: ApolloError) => console.error("Error uploading banner: ", error));
    }
  };
 /**
   * Deletes the selected banner by its ID.
   * 
   * @param {number} id - The ID of the banner to be deleted.
   */
  const handleDelete = (id: number) => {
    deleteBanner({
      variables: { id },
      refetchQueries: [{ query: GET_BANNERS }]
    })
      .catch((error: ApolloError) => console.error("Error deleting banner: ", error));
  };
 /**
   * Resets the image selection and preview state.
   */
  const handleCancel = () => {
    setSelectedImage(null);
    setPreview(null);
  };

  return (
    <Container className="admin-container">
      <Typography variant="h4" className="admin-title">
        Banner Admin Panel
      </Typography>
      <Box className="upload-section">
        <label htmlFor="imageInput" className="file-label">
          <span><AddAPhoto /> Choose Image</span>
        </label>
        <input
          type="file"
          accept="image/*"
          id="imageInput"
          onChange={handleImageChange}
          className="file-input"
        />
        {preview && (
          <Box className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <IconButton
              className="cancel-button"
              onClick={handleCancel}
              color="error"
            >
              <Cancel />
            </IconButton>
          </Box>
        )}
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!selectedImage}
          className="upload-button"
        >
          Upload Banner
        </Button>
      </Box>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Upload Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell>Loading...</TableCell></TableRow>
            ) : error ? (
              <TableRow><TableCell>Error fetching banners</TableCell></TableRow>
            ) : (
              data?.getBanners.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>{image.id}</TableCell>
                  <TableCell>
                    <img src={image.url} alt={image.name} className="table-image" />
                  </TableCell>
                  <TableCell>{image.name}</TableCell>
                  <TableCell>{image.uploadDate}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(+(image.id))}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminBanner;
