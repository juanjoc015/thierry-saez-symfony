<?php

namespace App\Controller;

use App\Entity\Photo;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/photographie')]
class PhotographieController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', name: 'photographie')]
    public function index(): Response
    {
        $photos = $this->entityManager->getRepository(Photo::class)->findAll();

        return $this->render('photographie/index.html.twig', [
            'photos' => $photos,
        ]);
    }
}
