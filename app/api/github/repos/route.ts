import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || "MohammadKevin";

    const githubRes = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-Admin-App",
        },
        next: { revalidate: 60 }, // cache for 1 minute
      }
    );

    if (!githubRes.ok) {
      if (githubRes.status === 404) {
        return NextResponse.json(
          { success: false, error: `Pengguna GitHub "${username}" tidak ditemukan.` },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: false, error: `Gagal mengambil data dari GitHub (Status: ${githubRes.status})` },
        { status: githubRes.status }
      );
    }

    const reposData = await githubRes.json();

    // Map relevant fields
    const repos = reposData.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      repoUrl: repo.html_url,
      description: repo.description || "",
      homepage: repo.homepage || "",
      language: repo.language || "",
      topics: Array.isArray(repo.topics) ? repo.topics : [],
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      updatedAt: repo.updated_at,
      isPrivate: repo.private || false,
    }));

    return NextResponse.json({
      success: true,
      username,
      total: repos.length,
      repos,
    });
  } catch (error: any) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
