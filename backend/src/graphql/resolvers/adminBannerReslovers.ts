import { Banner } from '../../entities/Banner';

export const bannerResolvers = {
  Query: {
    getBanners: async () => {
      try {
        const banners = await Banner.find();
        return banners;
      } catch (error) {
        throw new Error('Failed to fetch banners');
      }
    },
  },

  Mutation: {
    uploadBanner: async (
      _: any,
      { name, url, uploadDate }: { name: string; url: string; uploadDate: string }
    ) => {
      try {
        const newBanner = Banner.create({
          name,
          url,
          uploadDate,
        });

        await newBanner.save();  // Save the banner directly

        return newBanner; // Return the newly created banner
      } catch (error) {
        throw new Error('Failed to upload banner');
      }
    },

    deleteBanner: async (_: any, { id }: { id: number }) => {
      try {
        const banner = await Banner.findOne({ where: { id } });
        if (!banner) return { success: false, message: 'Banner not found' };

        await Banner.remove(banner); 

        return { success: true, message: 'Banner deleted successfully' };
      } catch (error) {
        return { success: false, message: 'Failed to delete banner' };
      }
    },
  },
};
