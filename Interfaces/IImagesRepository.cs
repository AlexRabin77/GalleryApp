using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GalleryApp.Models;

namespace GalleryApp.Interfaces
{
    public interface IImagesRepository
    {
        Task<Image[]> GetAll();
        Task<Image[]> GetRandom(int count, string[] existingIds);
    }
}
