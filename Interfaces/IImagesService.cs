using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GalleryApp.Models;

namespace GalleryApp.Interfaces
{
    public interface IImagesService
    {
        Task<Image[]> GetImages();
    }
}
