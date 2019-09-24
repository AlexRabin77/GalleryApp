using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Json.Net;
using GalleryApp.Models;
using GalleryApp.Interfaces;

namespace GalleryApp.Services
{
    public class PicsumService : IImagesService
    {
        private readonly HttpClient httpClient;
        private readonly string picsumUrl = "https://picsum.photos/v2/list?page=1&limit=100";

        public PicsumService()
        {
            this.httpClient = new HttpClient();
        }
        public async Task<Image[]> GetImages()
        {
            try
            {
                HttpResponseMessage response = await this.httpClient.GetAsync(this.picsumUrl);
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();

                Image[] images = JsonNet.Deserialize<Image[]>(responseBody);

                return images;
            }
            catch (Exception e)
            {
                return new Image[0];
            }
        }
    }
}
