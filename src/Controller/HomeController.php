<?php

namespace App\Controller;

use App\Entity\Painting;
use App\Repository\PaintingRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

final class HomeController extends AbstractController
{
    // public function __construct(private PaintingRepository $paintingRepository)
    // {
        
    // }

    #[Route('/', name: 'home')]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $paintings = $entityManager->getRepository(Painting::class)->findAll();

        return $this->render('home/index.html.twig', [
            'paintings' => $paintings,
        ]);
    }

    // public function tt(PaintingRepository $paintingRepository): Response
    // {
    //     $paintings = $paintingRepository->findAll(); // soit avec $this du construct soit $paintRepositoy de la fonction
        
    //     return $this->render('home/index.html.twig', [
    //         'paintings' => $paintings,
    //     ]);
    // }
}
