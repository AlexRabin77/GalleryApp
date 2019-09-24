using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GalleryApp.Interfaces;
using GalleryApp.Models;

namespace GalleryApp.Services
{
    public class ImagesRepository : IImagesRepository
    {
        private Image[] _images;
        private readonly Random _random;
        private readonly IImagesService _imagesService;

        public ImagesRepository(IImagesService imagesService)
        {
            this._images = new Image[0];
            this._random = new Random();
            this._imagesService = imagesService;
        }

        public async Task<Image[]> GetAll()
        {
            if (this._images.Length == 0)
            {
                this._images = await this._imagesService.GetImages();
            }

            return this._images;
        }

        public async Task<Image[]> GetRandom(int count, string[] existingIds)
        {
            Image[] allImages = await this.GetAll();
            List<Image> nextImages = new List<Image>();
            HashSet<string> excludeIds = new HashSet<string>(existingIds);

            for (int i = 0; i < count; i++)
            {
                allImages = allImages
                    .AsQueryable()
                    .Where(x => !excludeIds.Contains(x.id))
                    .ToArray();
                int index = this._random.Next(allImages.Length);
                nextImages.Add(allImages[index]);
                excludeIds.Add(allImages[index].id);
            }

            return nextImages.ToArray();
        }
    }
}
