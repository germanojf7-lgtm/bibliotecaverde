<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep Meta Pixel initialization and regional advertising permission in the shared browser-only advertising module; one root consent control prevents duplicate installs and synchronizes withdrawal across tabs.
- Keep the versioned advertising notice and local consent history together; preserving prior acceptance makes subsequent withdrawal auditable without sending consent identifiers to Meta.
