using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GalleryApp.Interfaces;
using GalleryApp.Models;

namespace GalleryApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IImagesRepository _imagesRepository;

        public ImagesController(IImagesRepository imagesRepository)
        {
            this._imagesRepository = imagesRepository;
        }

        [HttpGet("[action]")]
        public Task<Image[]> GetImages()
        {
            return this._imagesRepository.GetAll();
        }

        [HttpPost("[action]")]
        public Task<Image[]> GetRandomImages([FromBody]ExcludeIds model)
        {
            return this._imagesRepository.GetRandom(5, model.excludeIds);
        }
    }
}