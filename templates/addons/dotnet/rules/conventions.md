---
paths:
  - "**/*.cs"
  - "**/*.csproj"
---
# .NET / C# Conventions

## Target Framework

Target .NET 8+ (LTS). Use the latest C# language features.

## Async/Await

Always use async/await for I/O operations. Never block with `.Result` or `.Wait()`:

```csharp
// WRONG: blocking
var result = GetDataAsync().Result;

// CORRECT: async all the way up
public async Task<IActionResult> GetAsync()
{
    var result = await _service.GetDataAsync();
    return Ok(result);
}
```

## Dependency Injection

Register all services in `Program.cs`. Use constructor injection everywhere:

```csharp
// Registration
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<IPostService, PostService>();

// Usage
public class PostService(IPostRepository repository)
{
    public async Task<Post?> GetByIdAsync(int id) =>
        await repository.FindByIdAsync(id);
}
```

## Immutability

Prefer `record` types for DTOs and value objects:

```csharp
public record CreatePostDto(string Title, string Content, string AuthorId);
public record PostResponse(int Id, string Title, string Slug, DateTime CreatedAt);
```

## Error Handling

Use `Result<T>` pattern or problem details for API errors:

```csharp
// Return problem details from controllers
return Problem(
    title: "Post not found",
    statusCode: StatusCodes.Status404NotFound,
    detail: $"Post with ID {id} does not exist"
);
```

## Nullable Reference Types

Enable nullable reference types in all projects (`<Nullable>enable</Nullable>`). Always handle null explicitly.

## Validation

Use FluentValidation or DataAnnotations at the API boundary:

```csharp
public class CreatePostValidator : AbstractValidator<CreatePostDto>
{
    public CreatePostValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Content).NotEmpty();
    }
}
```

## Naming

- Classes, methods, properties: PascalCase
- Local variables, parameters: camelCase
- Private fields: `_camelCase`
- Constants: `PascalCase` (not ALL_CAPS)
- Interfaces: `IPrefix`
