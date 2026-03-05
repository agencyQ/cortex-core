# .NET Scaffold

Scaffold .NET 8 controllers, services, repositories, and DTOs following AgencyQ conventions.

## When to use

Invoke with `/dotnet-scaffold` when creating:
- A new API controller + endpoint
- A service + repository pair
- DTO records for a domain entity
- A minimal API endpoint group

## What to generate

### Controller

```csharp
// Controllers/<Resource>Controller.cs
[ApiController]
[Route("api/[controller]")]
public class <Resource>Controller(I<Resource>Service service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<<Resource>Response>>> GetAll() =>
        Ok(await service.GetAllAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<<Resource>Response>> GetById(int id)
    {
        var item = await service.GetByIdAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<<Resource>Response>> Create(Create<Resource>Dto dto)
    {
        var created = await service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }
}
```

### Service Interface + Implementation

```csharp
public interface I<Resource>Service
{
    Task<IEnumerable<<Resource>Response>> GetAllAsync();
    Task<<Resource>Response?> GetByIdAsync(int id);
    Task<<Resource>Response> CreateAsync(Create<Resource>Dto dto);
}
```

### DTOs (records)

```csharp
public record Create<Resource>Dto(string Title, /* other fields */);
public record <Resource>Response(int Id, string Title, DateTime CreatedAt);
```

## Instructions

1. Ask the user for the resource name and key properties if not specified
2. Generate controller, service interface, service implementation, and DTOs
3. Register the service in `Program.cs` (show the line to add)
4. Use `async Task<T>` throughout — no blocking calls
5. Use `record` types for all DTOs
6. Add XML doc comments on public API methods
